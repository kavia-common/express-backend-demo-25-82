#!/bin/bash
cd /home/kavia/workspace/code-generation/express-backend-demo-25-82/express_backend
npm run lint
LINT_EXIT_CODE=$?
if [ $LINT_EXIT_CODE -ne 0 ]; then
  exit 1
fi

