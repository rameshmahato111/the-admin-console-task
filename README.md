
## To use this application, instructions and requirements are given below

### Prerequisites
- Node.js 18+ 
- npm or yarn
- vscode or any code editor
### Installation

1. Clone the repository

git clone https://github.com/rameshmahato111/the-admin-console-task.git
cd theconsole

2. Install dependencies

npm install


3. Run the development server

npm run dev


4. Open your browser and navigate to `http://localhost:3000`

## Login Credentials

To login use the following credentials with the specific roles

 Admin | admin@perceivenow.com | admin123 |
 Analyst | analyst@perceivenow.com | analyst123 |
 Viewer | viewer@perceivenow.com | viewer123 |

## Project Structure

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Role Permissions

### Admin
- Full access to all features
- Can view, create, edit, and delete workflows, agents, policies
- User management access

### Analyst
- View and edit workflows, agents, and policies
- Cannot delete resources
- No user management access

### Viewer
- Read-only access
- Can view workflows, agents, policies, and logs
- Cannot create, edit, or delete anything

## Technologies Used

Next.js 16** - React framework
TypeScript- Type safety
Tailwind CSS - Styling
React Flow- Workflow visualization
Shadcn ui-Built in ui library
Radix U- Accessible UI components
Lucide React - Icons
React Compiler
