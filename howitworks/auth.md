# Authentication System - St. G. D. Convent School

## Overview
The St. G. D. Convent School website implements a two-factor authentication system for admin access using Supabase as the backend authentication service. The system combines traditional email/password authentication with an additional passkey verification step to ensure secure admin access.

## Architecture

### 1. Supabase Integration
- **Backend Service**: Supabase (hosted at `https://sfffnjjozmkmugdchhaq.supabase.co`)
- **Client Library**: `@supabase/supabase-js` v2.49.9
- **Database**: PostgreSQL with admin_users table for role management
- **Authentication**: Supabase Auth with email/password and session management

### 2. Authentication Flow

#### Two-Step Authentication Process:

**Step 1: Email/Password Authentication**
1. User visits `/admin/login` 
2. Can either sign in with existing credentials or sign up for new account
3. Email domains are restricted to specific allowed domains (`gmail.com`, `outlook.com`, `hotmail.com`)
4. Supabase handles user authentication and session management
5. Email verification required for new signups

**Step 2: Admin Passkey Verification**
1. After successful email/password auth, user must enter admin passkey
2. Hardcoded passkey: `143143` (stored in useAuth hook)
3. System checks if user's email domain is in allowed list
4. On successful verification, admin status is stored in localStorage
5. User record is automatically created/updated in `admin_users` table

### 3. Session Management

#### Context & State Management
- **useAuth Hook**: Custom React hook managing authentication state
- **React Query**: Used for data fetching and caching
- **Local Storage**: Stores admin verification status (`adminVerified` key)
- **Supabase Session**: Handles user session persistence across browser refreshes

#### Authentication States
```typescript
interface AuthState {
  isAuthenticated: boolean;    // Admin access granted
  loading: boolean;           // Auth state loading
  user: User | null;         // Supabase user object
}
```

### 4. Protected Routes

#### Admin Dashboard Access
- **Route**: `/admin/dashboard`
- **Protection**: Requires both Supabase auth AND admin passkey verification
- **Redirect Logic**: Unauthenticated users redirected to `/admin/login`
- **Auto-redirect**: Authenticated users accessing login page redirected to dashboard

#### Route Guards
```typescript
useEffect(() => {
  if (!authLoading && !isAuthenticated) {
    navigate("/admin/login");
  }
}, [isAuthenticated, authLoading, navigate]);
```

### 5. Database Schema

#### admin_users Table
```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Key Features
- Links Supabase auth users to admin roles
- Automatic user creation on first successful admin login
- Role-based access control (currently only 'admin' role)

### 6. Security Features

#### Domain Restrictions
- Only specific email domains allowed for admin access
- Configurable list: `["gmail.com", "outlook.com", "hotmail.com"]`
- Prevents unauthorized domain users from gaining admin access

#### Session Security
- Supabase handles secure session tokens
- Automatic session refresh and validation
- Session cleanup on logout
- Admin verification status cleared on session end

#### Error Handling
- Comprehensive error logging and user feedback
- Toast notifications for auth events
- Graceful handling of network errors and edge cases

### 7. Admin Features Access

#### After Successful Authentication
Admin users gain access to:
- **Content Management Dashboard**
- **Announcements Management**: Create, edit, delete school announcements
- **Gallery Management**: Upload and manage school life photos
- **Learning Materials Management**: Upload educational resources
- **Leadership Team Management**: Manage staff profiles and information

#### Admin Dashboard Components
- Real-time statistics display
- Tabbed interface for different management sections
- Role-based UI elements
- Secure logout functionality

### 8. Development & Production Considerations

#### Environment Variables
- Supabase URL and keys are currently hardcoded
- **Production Recommendation**: Move to environment variables
- **Security Note**: Admin passkey should be stored securely (database/env vars)

#### Authentication Persistence
- Sessions persist across browser refreshes
- Auth state listener monitors session changes
- Automatic cleanup on authentication errors

#### Error Recovery
- Password reset functionality available
- Email verification resend capability
- Session restoration on page reload

### 9. Technical Implementation

#### Key Files
- `src/hooks/useAuth.tsx`: Main authentication logic
- `src/integrations/supabase/client.ts`: Supabase configuration
- `src/pages/admin/AdminLogin.tsx`: Login interface
- `src/pages/admin/AdminDashboard.tsx`: Protected admin interface
- `src/integrations/supabase/types.ts`: TypeScript definitions

#### Files to Edit for Authentication Changes

**Core Authentication Logic:**
- `src/hooks/useAuth.tsx` - Main authentication hook
  - Change admin passkey (`ADMIN_PASSKEY` constant)
  - Modify allowed email domains (`ALLOWED_ADMIN_DOMAINS` array)
  - Update authentication flow logic
  - Add/remove authentication methods

**UI Components:**
- `src/pages/admin/AdminLogin.tsx` - Login page interface
  - Modify login form fields
  - Update UI/UX for authentication steps
  - Change error messages and validation
  - Customize branding and styling

- `src/pages/admin/AdminDashboard.tsx` - Protected admin dashboard
  - Add/remove admin features
  - Modify access control logic
  - Update dashboard layout and components
  - Change user information display

**Database Configuration:**
- `src/integrations/supabase/client.ts` - Supabase connection
  - Update Supabase URL and API keys
  - Modify client configuration options
  - Change connection settings

- `src/integrations/supabase/types.ts` - Database type definitions
  - Update table schemas when database changes
  - Add new table types for additional features
  - Modify existing type interfaces

**Routing & App Structure:**
- `src/App.tsx` - Main application routes
  - Add/remove protected routes
  - Modify route structure
  - Update authentication route guards

**Admin Management Components:**
- `src/components/admin/AnnouncementManager.tsx` - Announcements management
- `src/components/admin/GalleryManager.tsx` - Gallery management  
- `src/components/admin/LearningMaterialsManager.tsx` - Learning materials
- `src/components/admin/LeadershipManager.tsx` - Leadership team management
  - Modify admin feature functionality
  - Update CRUD operations
  - Change UI for content management

**Configuration Files:**
- `supabase/config.toml` - Supabase project configuration
  - Update project ID
  - Modify Supabase settings

**Common Edit Scenarios:**

1. **Change Admin Passkey:**
   - Edit `ADMIN_PASSKEY` in `src/hooks/useAuth.tsx`

2. **Add/Remove Allowed Email Domains:**
   - Modify `ALLOWED_ADMIN_DOMAINS` array in `src/hooks/useAuth.tsx`

3. **Add New Admin Features:**
   - Create new components in `src/components/admin/`
   - Update `src/pages/admin/AdminDashboard.tsx` to include new tabs
   - Add corresponding database tables in Supabase
   - Update `src/integrations/supabase/types.ts` with new types

4. **Modify Authentication Flow:**
   - Update logic in `src/hooks/useAuth.tsx`
   - Adjust UI in `src/pages/admin/AdminLogin.tsx`
   - Update route protection in `src/pages/admin/AdminDashboard.tsx`

5. **Change Database Structure:**
   - Update Supabase database schema
   - Regenerate types in `src/integrations/supabase/types.ts`
   - Modify queries in relevant components

#### State Management Flow
1. **Initial Load**: Check existing session
2. **Auth State Listener**: Monitor authentication changes
3. **Verification**: Two-step process with localStorage persistence
4. **Access Control**: Route protection and UI state management
5. **Cleanup**: Proper session termination and state reset

### 10. Future Enhancements

#### Recommended Improvements
- Move hardcoded passkey to secure backend storage
- Implement role-based permissions (beyond just admin)
- Add multi-factor authentication (MFA)
- Implement session timeout and refresh mechanisms
- Add audit logging for admin actions
- Enhanced email domain management (admin configurable)

#### Security Enhancements
- Rate limiting for authentication attempts
- IP-based access restrictions
- Enhanced password policies
- Regular security audits and updates

---

This authentication system provides a robust foundation for admin access while maintaining security best practices and user experience considerations. The two-factor approach ensures that even if email credentials are compromised, the additional passkey provides an extra layer of security.