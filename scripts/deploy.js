const { execSync } = require("child_process");

const getTag = () => {
  try {
    execSync(`git fetch --tags -f`);
    return execSync(`git tag -l | grep $(git describe HEAD)`).toString().trim();
  } catch (error) {
    
  }
}

const tag = getTag();
if(!tag){
  console.log('No tag found.');
  return;
}

console.log('Current tag', tag);
const imageName = `hienpham95/demo-deploy:${tag}`;
execSync(`docker build -t ${imageName} .`);
console.log('Image built successfully');
const pushImage = execSync(`docker push ${imageName}`).toString().trim();
console.log('Finished pushing image', pushImage);

// git tag -a fpro-v1.0.0.dev -m "tag version"