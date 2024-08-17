pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Check if the directory already exists
                    def projectDir = '/var/www/html/UI/LMS-WEB'
                    if (!fileExists(projectDir)) {
                        // Clone the repository if it doesn't exist
                        sh "git clone https://github.com/trytechitsolutions/LMS-WEB.git ${projectDir}"
                    } else {
                        // If the directory exists, pull the latest changes
                        dir(projectDir) {
                            sh 'git pull origin main'
                        }
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                // Navigate to your project directory
                dir('/var/www/html/UI/LMS-WEB') {
                    // Install npm dependencies
                    sh 'npm install'
                }
            }
        }

        stage('Restart Application') {
            steps {
                // Navigate to your project directory
                dir('/var/www/html/UI/LMS-WEB') {
                    // Restart the application using PM2
                    sh 'pm2 restart my-app || pm2 start app.js --name my-app'
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
