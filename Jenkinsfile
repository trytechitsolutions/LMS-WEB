pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                script {
                    def projectDir = '/var/www/html/UI/LMS-WEB'
                    // Check if the directory already exists
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
                dir('/var/www/html/UI/LMS-WEB') {
                    // Fix permissions and install npm dependencies
                    sh '''
                        # Ensure correct ownership and permissions
                        chown -R $(whoami):$(whoami) /var/www/html/UI/LMS-WEB
                        chmod -R 755 /var/www/html/UI/LMS-WEB
                        npm install
                    '''
                }
            }
        }

        stage('Restart Application') {
            steps {
                dir('/var/www/html/UI/LMS-WEB') {
                    // Restart the application using PM2
                    sh '''
                        if pm2 list | grep -q "app"; then
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
