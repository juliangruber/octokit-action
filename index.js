'use strict'

const core = require('@actions/core')
const { GitHub, context } = require('@actions/github')

const getAllInputs = () => {
  const inputs = {}
  for (const [key, value] of process.env) {
    if (key.startsWith('INPUT')) {
      const segs = key.split('_').slice(1)
      const inputName = segs.join(' ').toLowerCase()
      inputs[inputName] = value.trim()
    }
  }
  return inputs
}

const main = async () => {
  const token = core.getInput('github-token')
  const command = core.getInput('command')
  const inputs = getAllInputs()

  console.debug({ command, inputs })

  const octokit = new GitHub(token)
  const segs = command.split('.')
  let fn = octokit
  for (const seg of segs) fn = fn[seg]

  const args = {
    ...context.repo,
    ...inputs
  }

  console.debug({ args })

  const response = await fn.call(octokit, args)

  core.setOutput('response', response)
}

main().catch(err => core.setFailed(err.message))
