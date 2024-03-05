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

## ALL ENDPOINTS CAN BE ACCESSED AS A SUPER ADMIN!

### Paragraph 1
#### The assumed conditions are:
- All entities can be created with proper roles (PI and BPH)
- Validation for certain entities, e.g BPH divisions can't have more than one PJ, etc
- CRUD endpoints for making events (acara)

1. Create BPH, PI entities as much as you'd like, the DTO's are also in this documentation!
2. Most endpoints

`;
