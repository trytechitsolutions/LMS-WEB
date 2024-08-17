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

        stage('Install Dependencies') {
            steps {
                dir('/var/www/html/UI/LMS-WEB') {
                    sh '''
                        export PATH=$PATH:/path/to/node:/path/to/npm
                        npm install
                    '''
                }
            }
        }

        stage('Restart Application') {
            steps {
                dir('/var/www/html/UI/LMS-WEB') {
                    script {
                        sh '''
                            export PATH=$PATH:/path/to/node:/path/to/pm2
                            if pm2 describe app > /dev/null 2>&1; then
                                echo "Restarting existing app"
                                pm2 restart app
                            else
                                echo "Starting new app"
                                pm2 start app.js --name app
                            fi
                            pm2 save
                            pm2 list
                            timeout 60s pm2 logs app || true
                        '''
                    }
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
