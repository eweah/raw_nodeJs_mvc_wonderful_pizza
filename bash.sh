echo "enter password"
stty -echo
read password
stty echo
echo $password 
