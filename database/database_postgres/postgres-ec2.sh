# The first two lines will refresh the packages in the instance and install the latest version of Postgres.
sudo yum update
sudo yum install postgresql postgresql-server postgresql-devel postgresql-contrib postgresql-docs -y

sudo service postgresql initdb
# Find the postgresql.conf file (it’s usually in /etc/postgresql/12/main/postgresql.conf)
sudo find / -name "postgresql.conf"
sudo nano /var/lib/pgsql/data/postgresql.conf

# Open the file with your favourite text editor (yes, mine just so happens to be Nano #sorryNotSorry). We will find the configuration entry listen_addresses and change it from the default setting to ‘*’. This will allow the Postgres server to listen on the DNS name of the EC2 instance
# After that, find the pg_hba.conf and open it.
sudo find / -name "pg_hba.conf"
sudo nano /var/lib/pgsql/data/pg_hba.conf
# We will allow authentication from remote connections by adding the following lines to the end of the file. This will allow connections from any IP address. Please note that in production, it would be a good idea to restrict connections to only the ones you need (a well configured EC2 security group should be sufficient, but for peace of mind you should add the IP address of your application server instead of 0.0.0.0/0)
host    all             all              0.0.0.0/0                      md5
host    all             all              ::/0                            md5

# Make sure the hba_conf has the line (instead of "peer" , write "md5")
local   all    all     md5


# log in as the default Postgres user and create the user roles we will be using
sudo su postgres
psql -U postgres -c "CREATE ROLE postgres;"
psql -U postgres -c "ALTER ROLE  postgres  WITH LOGIN;"
psql -U postgres -c "ALTER USER  postgres  CREATEDB;"
psql -U postgres -c "ALTER USER  postgres  WITH PASSWORD 'admin';"
# Log out from the postgres user account and go back to your default user
exit

# we will restart the Postgres daemon by running:\
#sudo service postgresql start

sudo systemctl start postgresql-13
sudo systemctl stop postgresql-13

psql reviews -U postgres
sudo yum install gcc-c++