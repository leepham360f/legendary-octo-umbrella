const { execSync } = require('child_process')

const getTag = () => {
  try {
    execSync('git fetch')
    let tag = execSync(`git tag -l | grep $(git describe HEAD)`)
      .toString()
      .trim()
    const currentBranch = execSync(`git rev-parse --abbrev-ref HEAD`)
    if (currentBranch !== 'dev') {
      tag = tag.replace('dev', currentBranch)
    }
  } catch (error) {
    return execSync(`git describe --abbrev=0`).toString().trim();
  }
}

const tag = getTag()
if (!tag) {
  console.log('No tag found.')
  return
}

console.log('Current tag', tag)
const imageName = `hienpham95/demo-deploy:${tag}`
execSync(`docker build -t ${imageName} .`)
console.log('Image built successfully')
const pushImage = execSync(`docker push ${imageName}`).toString().trim()
console.log('Finished pushing image', pushImage)

// git tag -a fpro-v1.0.0.dev -m "tag version"
