const { execSync } = require('child_process')

const pushTag = (tag) => {
  execSync(`git tag -a ${tag} -m "Tag."`)
  execSync(`git push origin ${tag}`)
}

const getTag = () => {
  let tag
  const currentBranch = execSync(`git rev-parse --abbrev-ref HEAD`).toString().trim()
  try {
    execSync('git fetch --tags --unshallow')
    tag = execSync(`git tag -l | grep $(git describe HEAD)`).toString().trim()
    console.log('can get current tag', tag);
  } catch (error) {
    // get lastest tag of current branch
    tag = execSync(`git describe --abbrev=0`).toString().trim()
    console.log('catch tag', tag);
    // auto increase minor version for dev branch
    if (currentBranch === 'dev') {
      tag = tag.replace('dev', currentBranch)
      const minorVersionIndex = tag.indexOf('-v') + 6
      const currentMinorVersion = tag.charAt(minorVersionIndex)
      tag = tag.split('')
      tag[minorVersionIndex] = Number(currentMinorVersion) + 1
      tag = tag.join('')
    }
  }
  
  if (currentBranch !== 'dev') {
    tag = tag.replace('dev', currentBranch)
  }

  return tag
}

const tag = getTag()
console.log(tag)
pushTag(tag)
// const imageName = `hienpham95/demo-deploy:${tag}`;
// const buildImageCmd = `docker build -t ${imageName} .`
// execSync(buildImageCmd)
// execSync(`docker push ${imageName}`)
// git tag -a fpro-v1.0.0.dev -m "tag version"
