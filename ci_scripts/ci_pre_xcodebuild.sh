#!/bin/bash

echo "Running pre-Xcode build script..."

# Navigate to the iOS directory and run pod install
cd "$CI_WORKSPACE/ios"
pod install
