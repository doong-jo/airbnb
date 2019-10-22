username="your_user_name"
password="your_password"
branch="your_branch_name"
project_dir="your_project_dir"

url="https://$username:$password@github.com/doong-jo/membership-airbnb.git"

cd $project_dir
git remote set-url origin $url
git fetch

find_origin="git rev-parse origin/$branch"
origin_hash=$($find_origin)

find_local=$(git rev-parse $branch)
local_hash=$find_local

# 같으면 exit
if [ "$origin_hash" == "$local_hash" ]; then
        exit
fi

# 둘이 다르면 build
git pull $url

sudo npm install
sudo npm start
