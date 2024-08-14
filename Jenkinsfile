stages:
  - checkout

checkout:
  stage: checkout
  script:
    - https://github.com/trytechitsolutions/LMS-WEB.git
    - cd your-project
    - git checkout main

after_script:
  - if [ "$CI_JOB_STATUS" == "success" ]; then echo "Pipeline succeeded!"; fi
  - if [ "$CI_JOB_STATUS" == "failed" ]; then echo "Pipeline failed."; fi
  - rm -rf *
