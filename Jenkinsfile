pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout the repository
                git url: 'https://github.com/trytechitsolutions/LMS-WEB.git', branch: 'main'
                
                // Navigate to your project directory (if necessary)
                dir('your-project') {
                    // Commands to execute inside the 'your-project' directory
                    sh 'git checkout main'
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
