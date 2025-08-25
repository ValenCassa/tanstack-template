-- Seed data for React Issue Tracker
-- This file contains SQL statements to populate the database with sample data

-- Insert 5 users
INSERT INTO users (id, name, email, "emailVerified", image, "createdAt", "updatedAt") VALUES
('user_1', 'Sarah Chen', 'sarah.chen@reactdev.com', true, 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face', NOW(), NOW()),
('user_2', 'Marcus Rodriguez', 'marcus.rodriguez@reactdev.com', true, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face', NOW(), NOW()),
('user_3', 'Priya Patel', 'priya.patel@reactdev.com', true, 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face', NOW(), NOW()),
('user_4', 'Alex Thompson', 'alex.thompson@reactdev.com', true, 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face', NOW(), NOW()),
('user_5', 'Zoe Williams', 'zoe.williams@reactdev.com', true, 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face', NOW(), NOW());

-- Insert 10 posts (2 per user)
INSERT INTO posts (id, title, description, "authorId", "createdAt", "updatedAt") VALUES
-- Sarah's posts
(gen_random_uuid(), 'React 18 Strict Mode causing double renders in development', 'I''m experiencing unexpected double renders when using React 18 Strict Mode in development. This is causing issues with my useEffect hooks and state updates. Has anyone else encountered this? Looking for workarounds or if this is expected behavior.', 'user_1', NOW(), NOW()),
(gen_random_uuid(), 'Best practices for managing complex form state with React Hook Form', 'I''m building a complex multi-step form with React Hook Form and need advice on the best way to manage state across steps. Currently using useFormContext but wondering if there are better patterns for large forms with validation.', 'user_1', NOW(), NOW()),

-- Marcus's posts
(gen_random_uuid(), 'Performance optimization: React.memo vs useMemo vs useCallback', 'I''m trying to optimize my React app performance and getting confused about when to use React.memo, useMemo, and useCallback. Can someone explain the differences and when each is most appropriate?', 'user_2', NOW(), NOW()),
(gen_random_uuid(), 'TypeScript + React: Proper typing for event handlers', 'I''m struggling with TypeScript types for React event handlers, especially for custom events and form submissions. Looking for examples of proper typing patterns and best practices.', 'user_2', NOW(), NOW()),

-- Priya's posts
(gen_random_uuid(), 'React Query vs SWR: Which one should I choose?', 'I''m starting a new project and can''t decide between React Query and SWR for data fetching. Both seem great but I''d love to hear from developers who have used both. What are the pros and cons?', 'user_3', NOW(), NOW()),
(gen_random_uuid(), 'Testing React components with Jest and React Testing Library', 'I''m writing tests for my React components and having trouble with async operations and user interactions. Looking for examples of how to properly test useEffect, async functions, and user events.', 'user_3', NOW(), NOW()),

-- Alex's posts
(gen_random_uuid(), 'State management: Redux Toolkit vs Zustand vs Context API', 'My app is growing and I need to choose a state management solution. I''ve used Redux before but it seems heavy. Zustand looks promising, and Context API might be enough. What are your experiences?', 'user_4', NOW(), NOW()),
(gen_random_uuid(), 'React Server Components: When and how to use them?', 'I''m excited about React Server Components but not sure when to use them vs regular components. Can someone explain the use cases and show examples of when RSCs provide the most benefit?', 'user_4', NOW(), NOW()),

-- Zoe's posts
(gen_random_uuid(), 'Building accessible React components with proper ARIA labels', 'I''m working on making my React app more accessible and need help with ARIA labels and screen reader support. Looking for examples of properly accessible components and common pitfalls to avoid.', 'user_5', NOW(), NOW()),
(gen_random_uuid(), 'React Native vs React Web: Sharing code between platforms', 'I''m building an app that needs to work on both web and mobile. I''m considering React Native Web or a monorepo approach. Has anyone successfully shared significant code between platforms? What''s your setup?', 'user_5', NOW(), NOW());
