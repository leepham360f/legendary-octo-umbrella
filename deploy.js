const { execSync } = require("child_process");

const getTag = () => {
  try {
    execSync(`git fetch --tags`);
    return execSync(`git tag -l | grep $(git describe HEAD)`).toString().trim();
  } catch (error) {
    console.log(error);
  }
}

const tag = getTag();
console.log('Current tag', tag);
const imageName = `hienpham95/demo-deploy:${tag}`;
execSync(`docker build -t ${imageName} .`);
console.log('image built successfully');
console.log('run docker login');
const dockerhub = execSync(`echo "${process.env.DOCKER_PASSWORD}" | docker login -u "${process.env.DOCKER_USERNAME}" --password-stdin`).toString().trim();
console.log(dockerhub);
const pushImage = execSync(`docker push ${imageName}`).toString().trim();
console.log('Finished pushing image', pushImage);

// git tag -a da-v1.0.0.dev -m "tag version"