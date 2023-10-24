echo "Switching to branch main"
git checkout main

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r build/* root@31.129.101.237:/var/www/shosh/

echo "Done!"
