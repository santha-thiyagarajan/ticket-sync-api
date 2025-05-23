import { Ticket } from '../../tickets/entities/ticket.entity';

export const mockTickets: Partial<Ticket>[] = [
  {
    title: 'Fix login page styling',
    description: 'The login page has alignment issues on mobile devices. Need to fix the CSS.',
    status: 'open',
    priority: 'medium',
    tags: ['frontend', 'css', 'mobile'],
  },
  {
    title: 'Implement password reset functionality',
    description: 'Create an endpoint and email delivery system for password reset.',
    status: 'in_progress',
    priority: 'high',
    tags: ['backend', 'security', 'email'],
  },
  {
    title: 'Add unit tests for user service',
    description: 'Write comprehensive unit tests for all methods in the user service.',
    status: 'review',
    priority: 'medium',
    tags: ['testing', 'backend'],
  },
  {
    title: 'Database optimization for reports',
    description: 'The reports page loads slowly. Need to optimize the database queries.',
    status: 'open',
    priority: 'critical',
    tags: ['database', 'performance'],
  },
  {
    title: 'Update dependencies to latest versions',
    description: 'Some dependencies are outdated and have security vulnerabilities.',
    status: 'resolved',
    priority: 'low',
    tags: ['maintenance', 'security'],
  },
  {
    title: 'Implement dark mode',
    description: 'Add dark mode support across the entire application with toggle in settings.',
    status: 'open',
    priority: 'medium',
    tags: ['frontend', 'ui', 'feature'],
  },
  {
    title: 'Fix broken image upload on profile page',
    description: 'Users are unable to upload profile pictures. Investigation needed.',
    status: 'in_progress',
    priority: 'high',
    tags: ['frontend', 'bug', 'upload'],
  },
  {
    title: 'Add pagination to dashboard tables',
    description: 'All tables on the dashboard need to be paginated to improve performance.',
    status: 'open',
    priority: 'medium',
    tags: ['frontend', 'performance', 'ui'],
  },
  {
    title: 'Investigate and fix memory leak',
    description: 'The application becomes slow after extended use. Possible memory leak to investigate.',
    status: 'in_progress',
    priority: 'critical',
    tags: ['backend', 'performance', 'bug'],
  },
  {
    title: 'Add audit logging for sensitive operations',
    description: 'Need to implement audit logging for user creation, deletion, and permission changes.',
    status: 'open',
    priority: 'high',
    tags: ['backend', 'security', 'audit'],
  },
  {
    title: 'Update API documentation',
    description: 'API documentation is outdated. Update to reflect recent changes.',
    status: 'review',
    priority: 'low',
    tags: ['documentation', 'api'],
  },
  {
    title: 'Implement email notifications',
    description: 'Add email notifications for ticket updates and assignments.',
    status: 'open',
    priority: 'medium',
    tags: ['backend', 'email', 'feature'],
  },
  {
    title: 'Add export to CSV feature',
    description: 'Users need to be able to export ticket lists to CSV format.',
    status: 'closed',
    priority: 'low',
    tags: ['frontend', 'feature', 'export'],
  },
  {
    title: 'Fix CORS issues with third-party API',
    description: 'Integration with third-party API is failing due to CORS configuration.',
    status: 'open',
    priority: 'high',
    tags: ['backend', 'integration', 'bug'],
  },
  {
    title: 'Implement SSO authentication',
    description: 'Integrate with company-wide SSO system for authentication.',
    status: 'in_progress',
    priority: 'critical',
    tags: ['backend', 'security', 'authentication'],
  },
]; 