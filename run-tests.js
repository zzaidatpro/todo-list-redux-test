const { execSync } = require('child_process');

const testType = process.argv[2];

function runCommand(cmd) {
  try {
    execSync(cmd, { stdio: 'inherit' });
  } catch (error) {
    process.exit(1);
  }
}

switch (testType) {
  case 'unit':
    console.log('🧪 Executing Unit Tests (Redux Reducers)...');
    runCommand('jest src/redux/taskSlice.test.js');
    break;

  case 'integration':
    console.log('🧩 Executing Integration Tests (React Components + Store)...');
    runCommand('jest src/tests/integration');
    break;

  case 'e2e':
    console.log('🌐 Executing E2E Tests (Playwright Browser)...');
    runCommand('playwright test');
    break;

  case 'all':
    console.log('🚀 Running ALL Tests...');
    runCommand('jest src/redux/taskSlice.test.js');
    runCommand('jest src/tests/integration');
    runCommand('playwright test');
    break;

  default:
    console.log(`
⚠️ Invalid test type provided!
Usage: node run-tests.js [unit | integration | e2e | all]
    `);
    process.exit(1);
}