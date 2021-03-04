const { execSync } = require("child_process");

const getTag = () => {
  try {
    execSync(`git fetch --tags`);
    return execSync(`git tag -l | grep $(git describe HEAD)`).toString().trim();
  } catch (error) {
    console.log(error);
    return 'da-v1.0.0.dev';
  }
}

const tag = getTag();
console.log('Current tag', tag);
const imageName = `hienpham95/demo-deploy:${tag}`;
execSync(`docker build -t ${imageName} .`);
console.log('Image built successfully');
const pushImage = execSync(`docker push ${imageName}`).toString().trim();
console.log('Finished pushing image', pushImage);

// git tag -a da-v1.0.0.dev -m "tag version"