'use strict'

const core = require('@actions/core')
const { GitHub, context } = require('@actions/github')

const getAllInputs = () => {
  const inputs = {}
  for (const [key, value] of Object.entries(process.env)) {
    if (key.startsWith('INPUT')) {
      const segs = key.split('_').slice(1)
      const inputName = segs.join('_').toLowerCase()
      inputs[inputName] = value.trim()
    }
  }
  return inputs
}

const main = async () => {
  const token = core.getInput('github-token')
  const command = core.getInput('command')
  const inputs = getAllInputs()

  core.debug(`command: ${command}`)
  core.debug(`inputs: ${JSON.stringify(inputs)}`)

  const octokit = new GitHub(token)
  const segs = command.split('.')
  let fn = octokit
  for (const seg of segs) fn = fn[seg]

  const args = {
    ...context.repo,
    ...inputs
  }

  core.debug(`args: ${JSON.stringify(args)}`)

  const response = await fn.call(octokit, args)

  core.setOutput('response', JSON.stringify(response.data))
}

main().catch(err => core.setFailed(err.message))
