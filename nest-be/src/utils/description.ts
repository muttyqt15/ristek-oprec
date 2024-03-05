export const description = `# Welcome to **OKK Forge**!

**OKK Forge** was built extensively with completely functional endpoints, entities, and is capable of all the operations in managing OKK!

With role-based authentication with roles like *BPH*, *PI*, *MENTEE*, and more, **OKK Forge** is a safe place to manage OKK!

### Role-Based Authentication

OKK Forge implements role-based authentication, allowing users to access endpoints based on their assigned roles. Roles include BPH, PI, MENTOR, and more, ensuring secure access to the API and its functionalities.

### User Management

The API provides endpoints for managing different user roles, such as creating, updating, and deleting BPH members, pengurus inti (PI), speakers, sponsors, and mentors. Users can sign up, log in, and log out, with authentication tokens provided for secure access.

### Event Management

OKK Forge offers features for managing OKK events, including creating, updating, and deleting events. Users with appropriate permissions, such as PI and BPH, can perform these operations, ensuring effective event management.

### Mentoring System

The API includes functionalities for managing mentoring groups, mentors, and mentees within the organization. Mentors can create mentee entities, while users can access information about mentoring groups and mentees.

### Rapat Management

OKK Forge allows users to manage rapat (meetings) within the organization. Users with appropriate permissions, such as PJ and WAPJ in BPH, can create, update, and delete rapat, ensuring efficient communication and collaboration.

### Token Management

Users can refresh their authentication tokens to maintain secure access to the API. Tokens can be refreshed using the provided endpoint, enhancing the security of user sessions. 

#### Another thing to note, is that our all functionality works as expected - like deleting a sponsor will also remove it from any related tables, same thing for speaker, etc!

# Testing procedure

## While semua endpoint disini dapat ditembak oleh testing platform front-end, tetap disarankan untuk menggunakan Postman atau testing platform resmi lain untuk mempermudah prosedur auth token, ataupun error handling. 
## ALL ENDPOINTS CAN BE ACCESSED AS A SUPER ADMIN!

## Study Case

### Paragraph 1
#### The assumed conditions are:
- All entities can be created with proper roles (PI and BPH)
- Validation for certain entities, e.g BPH divisions can't have more than one PJ, etc
- CRUD endpoints for making events (acara)

1. CRUD BPH, PI entities as much as you'd like, the DTO's are also in this documentation! Use **auth** or the manual (pi, bph, mentor) endpoints with the proper api body - the difference is that in the manual endpoints, they will return the entity with a null refresh token. If you do decide to use the auth endpoints, sign up first, and login with the same api body.
2. CRUD events can be tested as much as required too, with the prerequisite that before adding sponsors and speakers, you need to define the speakers and sponsors first! (You can still create an event without sponsors/speakers)
3. Make sure that the roles you fill in are valid! You can see the available roles at most DTO's!

NOTES:
BPH and PI members are two different entities derived from a parent class named User. For the roles, I used enums to make it so BPH and PI can have different roles, instead of creating different entities for each and every role. 

### Paragraph 2
#### The assumed conditions are:
- OKK Groups can be CRUD
- Proper auth with these OKK Groups still apply

1. Access the /mentoring/group endpoints to CRUD groups
2. Before creating any groups, make sure to create the required objects first (e.g creating mentor and mentees first)

### Paragraph 3
#### The assumed conditions are:


`;
