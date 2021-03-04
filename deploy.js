const { execSync } = require("child_process");

const getTag = () => {
  try {
    return execSync(`git tag -l | grep $(git describe HEAD)`).toString().trim();
  } catch (error) {
    return execSync(`git describe --tags --abbrev=0`).toString().trim();
  }
}

const tag = getTag();
console.log('Current tag', tag);
const imageName = `hienpham95/demo-deploy:${tag}`;
execSync(`docker build -t ${imageName} .`);
console.log('image built successfully');
console.log('run docker login');
const dockerhub = execSync(`echo "${process.env.DOCKER_USERNAME}" | docker login -u ${process.env.DOCKER_PASSWORD} --password-stdin`).toString().trim();
console.log(dockerhub);
const pushImage = execSync(`docker push ${imageName}`).toString().trim();
console.log('Finished pushing image', pushImage);

// git tag -a da-v1.0.0.dev -m "tag version"