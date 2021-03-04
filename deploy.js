const { execSync } = require("child_process");

const tag = execSync(`git tag -l | grep $(git describe HEAD)`).toString().trim();
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