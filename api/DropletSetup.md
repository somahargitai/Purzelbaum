# Set up DigitalOcean Droplet to host API

## Create the Droplet

- Go to Digital Ocean and create the Droplet
- Set up ssh
- click `Launch Droplet Console`

## Main Installations: Node & Git

Install nvm and Node if not present

- nvm `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash`
- Node.js `nvm install 22`

Check:

```bash
  node --version
  nvm --version
```

Git is most likely present, but you will need an ssh key and you have to __add it on Github to your SSH keys in Settings__.

```bash
ssh-keygen -t ed25519 -f ~/.ssh/id_ed25519 -C "droplet-github" -N
cat .ssh/id_ed25519.pub 
```

## API Installations and Start

```bash
npm install -g pm2 # install PM2 globally
ufw allow 3005 # allow the API port
ufw allow OpenSSH # allow SSH if using firewall
ufw allow ssh
ufw allow http
ufw allow https
ufw enable # enable the firewall
ufw status 

git clone <git@github.com>:somahargitai/Purzelbaum.git # clone the repo
cd Purzelbaum/api # go into the api folder
nvm install 22 # install Node.js v22 if not yet installed
nvm use 22 # switch to Node.js v22
npm install # install dependencies
nano .env # create environment variables file and paste variables
npm run start # test the API manually, you can stop it
pm2 start npm --name purzel-api -- run start # start API with PM2
pm2 save # save current process list
pm2 startup # enable auto-start on reboot
pm2 status # check if API is running

curl http://localhost:3005/hello
pm2 logs purzel-api # view logs if needed
```

## nginx

```bash
sudo apt install nginx
sudo apt install certbot python3-certbot-nginx
nano /etc/nginx/sites-available/purzelbaum  # create a new file for nginx settings
```

Paste:

```bash
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3005;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
