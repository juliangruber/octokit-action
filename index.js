'use strict'

const core = require('@actions/core')
const { GitHub, context } = require('@actions/github')

const main = async () => {
  const token = core.getInput('github-token')
  const command = core.getInput('command')
  const args = JSON.parse(core.getInput('args'))

  core.debug(`command: ${command}`)
  core.debug(`args: ${JSON.stringify(args)}`)

  const octokit = new GitHub(token)
  const segs = command.split('.')
  let fn = octokit
  for (const seg of segs) fn = fn[seg]

  const mergedArgs = {
    ...context.repo,
    ...args
  }

  core.debug(`mergedArgs: ${JSON.stringify(mergedArgs)}`)

  const response = await fn.call(octokit, mergedArgs)

  core.setOutput('response', JSON.stringify(response.data))
}

main().catch(err => core.setFailed(err.message))
