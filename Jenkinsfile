pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                script {
                    def projectDir = '/var/www/html/UI/LMS-WEB'
                    if (!fileExists(projectDir)) {
                        sh "git clone https://github.com/trytechitsolutions/LMS-WEB.git ${projectDir}"
                    } else {
                        dir(projectDir) {
                            sh 'git pull origin main'
                        }
                    }
                }
            }
        }

        stage('Fix Permissions') {
            steps {
                dir('/var/www/html/UI/LMS-WEB') {
                    // Fix permissions
                    sh 'sudo chown -R jenkins:jenkins .'
                    sh 'sudo chmod -R 755 .'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('/var/www/html/UI/LMS-WEB') {
                    sh 'npm install'
                }
            }
        }

        stage('Restart Application') {
            steps {
                dir('/var/www/html/UI/LMS-WEB') {
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
            cleanWs()
        }
    }
}
