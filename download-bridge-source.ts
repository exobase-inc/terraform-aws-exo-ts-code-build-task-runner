import path from 'path'
import fs from 'fs'
import octo from 'octokit-downloader'
import cmd from 'cmdish'

const downloadBridgeSource = async () => {

  //
  // Load vars
  //
  const varsString = await fs.promises.readFile(`${__dirname}/tfvars.json`, 'utf-8')
  const vars = JSON.parse(varsString)

  if (!vars.use_bridge) return

  await octo.download({
    from: 'https://github.com/exobase-inc/bridge-api-task-runner',
    to: path.join(__dirname, 'bridge.zip'),
    unzip: true
  })

  await cmd('yarn', { cwd: path.join(__dirname, 'bridge') })
  await cmd('yarn build', { cwd: path.join(__dirname, 'bridge') })
}

downloadBridgeSource()