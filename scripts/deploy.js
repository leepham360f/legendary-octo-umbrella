const { execSync } = require('child_process')

const getTag = () => {
  let tag
  try {
    execSync('git fetch --unshallow')
    tag = execSync(`git tag -l | grep $(git describe HEAD)`).toString().trim()
  } catch (error) {
    // get lastest tag of current branch
    tag = execSync(`git describe --abbrev=0`).toString().trim()
    const minorVersionIndex = tag.indexOf('-v') + 6
    let currentMinorVersion = tag.charAt(minorVersionIndex)
    tag = tag.split('')
    tag[minorVersionIndex] = Number(currentMinorVersion) + 1
    tag = tag.join('')
  }

  const currentBranch = execSync(`git rev-parse --abbrev-ref HEAD`)
  if (currentBranch !== 'dev') {
    tag = tag.replace('dev', currentBranch)
  }

  return tag
}

const tag = getTag()
console.log(tag)
if (!tag) {
  console.log('No tag found.')
  return
}
const imageName = `hienpham95/demo-deploy:${tag}`
execSync(`docker build -t ${imageName} .`)
const pushImage = execSync(`docker push ${imageName}`).toString().trim()
console.log('Finished pushing image', pushImage)

// git tag -a fpro-v1.0.0.dev -m "tag version"
