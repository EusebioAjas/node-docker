pipeline {
    agent any

    stages {
        stage('git') {
            steps {
                git branch: 'develop', url: 'https://github.com/EusebioAjas/node-docker.git'
            }
        }
        stage('Ejecutar los test cases') {
            steps {
                sh 'node --test'
            }
        }
        stage('Crear imagen') {
            steps {
                sh "docker build -t sicei-${env.GIT_BRANCH}:1.0.0-${env.BUILD_NUMBER} ."
                sh 'docker images'
            }
        }
        stage('Detener contenedores y ejecutar el actual') {
            steps {
                sh 'docker ps -aq | xargs docker stop'
                sh "docker run -d -p 3000:3000 sicei-${env.GIT_BRANCH}:1.0.0-${env.BUILD_NUMBER}"
                sh 'docker ps'
            }
        }
    }
}
