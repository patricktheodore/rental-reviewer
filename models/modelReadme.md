
## Specifications
* The database models have the following fields and associations:
  * `User`
    * `id`: primary key
    * `name`
    * `email`
    * `password`
  * `Project`
    * `id`: primary key
    * `name`
    * `description`
    * `date_created`
    * `needed_funding`
    * `user_id`: foreign key that references `User.id`


User
    id: primary key
    name:
    email:
    password:

Property
    id: primary key
    address: 

Review
    id: primary key
    title: 
    user_id: foreign key
    property_id: foreign key
    rating: integer (1-5)
    description: text

User has many reviews
Property has many reviews
Review belongsToProperty through the user 




