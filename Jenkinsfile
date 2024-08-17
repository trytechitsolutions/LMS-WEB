pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the repository
                git url: 'https://github.com/trytechitsolutions/LMS-WEB.git', branch: 'main'
            }
        }

        stage('Update Code') {
            steps {
                // Navigate to your project directory
                dir('your-project') {
                    // Pull the latest changes from the main branch
                    sh 'git pull origin main'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                // Navigate to your project directory
                dir('your-project') {
                    // Install npm dependencies
                    sh 'npm install'
                }
            }
        }

        stage('Restart Application') {
            steps {
                // Navigate to your project directory
                dir('your-project') {
                    // Restart the application using PM2
                    sh 'pm2 stp app.js'
                    sh 'pm2 start app.js'
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed.'
        }
        always {
            // Clean up workspace after the job
            cleanWs()
        }
    }
}
