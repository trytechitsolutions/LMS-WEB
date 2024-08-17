pipeline {
    agent any

    environment {
        PROJECT_DIR = '/var/www/html/UI/LMS-WEB'
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Check if the directory already exists
                    if (!fileExists(PROJECT_DIR)) {
                        // Clone the repository if it doesn't exist
                        sh "git clone https://github.com/trytechitsolutions/LMS-WEB.git ${PROJECT_DIR}"
                    } else {
                        // If the directory exists, pull the latest changes
                        dir(PROJECT_DIR) {
                            sh 'git pull origin main'
                        }
                    }
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                dir(PROJECT_DIR) {
                    // Fix permissions if needed
                    sh 'sudo chown -R jenkins:jenkins ${PROJECT_DIR} || true'
                    
                    // Install npm dependencies
                    sh '''
                        npm install || {
                            echo "npm install failed. Exiting..."
                            exit 1
                        }
                    '''
                }
            }
        }

        stage('Restart Application') {
            steps {
                dir(PROJECT_DIR) {
                    sh '''
                        if pm2 describe app > /dev/null 2>&1; then
                            pm2 restart app
                        else
                            pm2 start app.js --name app
                        fi
                    '''
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
