-- Insert users
INSERT INTO users (id, name, email, "emailVerified", image, "createdAt", "updatedAt") VALUES
('user-olivia-smith', 'Olivia Smith', 'olivia.smith@example.com', true, 'https://i.imgur.com/7PD4JtG.png', NOW(), NOW()),
('user-matt-silverman', 'Matt Silverman', 'matt.silverman@example.com', true, 'https://i.imgur.com/10A4TJG.png', NOW(), NOW()),
('user-emma-house', 'Emma House', 'emma.house@example.com', true, 'https://i.imgur.com/J3JBzCR.png', NOW(), NOW()),
('user-jennifer-patel', 'Jennifer Patel', 'jennifer.patel@example.com', true, 'https://i.imgur.com/JidzbYz.png', NOW(), NOW()),
('user-ignacio-rossi', 'Ignacio Rossi', 'ignacio.rossi@example.com', true, 'https://i.imgur.com/5xFL5EU.png', NOW(), NOW());

-- Insert posts
INSERT INTO posts (id, title, description, board, "createdAt", "updatedAt", "authorId") VALUES
-- Olivia Smith's posts
(gen_random_uuid(), 'React 19 useTransition Hook Performance Issues', 'I''ve been testing the new useTransition hook in React 19 and noticed significant performance degradation when handling large datasets. The transitions seem to block the UI longer than expected, especially with concurrent rendering enabled. Has anyone else experienced this? Looking for optimization strategies or potential workarounds.', 'performance', NOW() - INTERVAL '5 days', NOW() - INTERVAL '5 days', 'user-olivia-smith'),

(gen_random_uuid(), 'Add Built-in Support for CSS Container Queries', 'With CSS container queries now widely supported by browsers, it would be amazing if React had built-in support for responsive components based on container size rather than viewport. This would make component-driven responsive design much more intuitive and powerful.', 'feature_request', NOW() - INTERVAL '3 days', NOW() - INTERVAL '3 days', 'user-olivia-smith'),

-- Matt Silverman's posts
(gen_random_uuid(), 'Server Components Documentation Needs Examples', 'The React Server Components documentation is quite technical but lacks practical, real-world examples. It would be helpful to have more comprehensive examples showing common patterns like data fetching, error handling, and integration with client components. The current examples are too basic for production use cases.', 'documentation', NOW() - INTERVAL '7 days', NOW() - INTERVAL '7 days', 'user-matt-silverman'),

(gen_random_uuid(), 'Memory Leak in useEffect with Cleanup Functions', 'I''m encountering memory leaks when using useEffect with cleanup functions in React 18. The cleanup doesn''t seem to run properly in certain edge cases, particularly when components unmount during Suspense boundaries. This is causing accumulation of event listeners and timers. Anyone else seeing this?', 'bug', NOW() - INTERVAL '4 days', NOW() - INTERVAL '4 days', 'user-matt-silverman'),

-- Emma House's posts
(gen_random_uuid(), 'How to Handle Authentication in Server Components?', 'I''m struggling to understand the best practices for handling user authentication in React Server Components. Should I pass auth state as props from a client component, or is there a better pattern? The documentation doesn''t clearly explain how to access user session data on the server side.', 'question', NOW() - INTERVAL '6 days', NOW() - INTERVAL '6 days', 'user-emma-house'),

(gen_random_uuid(), 'Improve Error Boundaries for Async Components', 'Current error boundaries don''t handle promise rejections from Server Components well. When a server component fails, the error boundary often doesn''t catch it properly, leading to white screens. We need better error handling mechanisms that work seamlessly with the new architecture.', 'feature_request', NOW() - INTERVAL '2 days', NOW() - INTERVAL '2 days', 'user-emma-house'),

-- Jennifer Patel's posts
(gen_random_uuid(), 'React DevTools Extension Crashes with Large Component Trees', 'The React DevTools extension consistently crashes when inspecting applications with large component trees (1000+ components). This makes debugging production applications nearly impossible. The extension needs better performance optimization for complex applications.', 'bug', NOW() - INTERVAL '8 days', NOW() - INTERVAL '8 days', 'user-jennifer-patel'),

(gen_random_uuid(), 'Add Native TypeScript Support for JSX Transform', 'It would be great if React had native TypeScript support for the new JSX transform without requiring additional configuration. Currently, setting up the new JSX transform with TypeScript requires manual tsconfig changes and can be confusing for developers new to the ecosystem.', 'feature_request', NOW() - INTERVAL '1 day', NOW() - INTERVAL '1 day', 'user-jennifer-patel'),

-- Ignacio Rossi's posts
(gen_random_uuid(), 'Best Practices for State Management in Server Components?', 'What are the recommended patterns for managing state when using Server Components? Traditional state management libraries like Redux don''t seem to fit well with the server/client boundary. Are there emerging patterns or should we stick to URL state and database queries?', 'question', NOW() - INTERVAL '9 days', NOW() - INTERVAL '9 days', 'user-ignacio-rossi'),

(gen_random_uuid(), 'Hydration Mismatch Errors Too Cryptic', 'Hydration mismatch errors in React 18 are extremely difficult to debug. The error messages don''t provide enough context about where the mismatch occurred or what caused it. This makes fixing SSR issues very time-consuming. Better error messages with component traces would be invaluable.', 'bug', NOW() - INTERVAL '10 days', NOW() - INTERVAL '10 days', 'user-ignacio-rossi');

-- Insert comments (using CTEs to reference post IDs)
WITH post_refs AS (
  SELECT id, title FROM posts
)
INSERT INTO post_comments (id, "postId", "userId", content, "createdAt", "updatedAt")
SELECT 
  gen_random_uuid(),
  p.id,
  comments.user_id,
  comments.content,
  NOW() - (comments.days_ago || ' days')::INTERVAL,
  NOW() - (comments.days_ago || ' days')::INTERVAL
FROM post_refs p
CROSS JOIN (
  VALUES 
    ('React 19 useTransition Hook Performance Issues', 'user-matt-silverman', 'I''ve seen similar issues! Try wrapping your heavy computations in useMemo and make sure you''re not triggering transitions unnecessarily. Also check if you have any blocking operations in your transition callbacks.', '4'),
    ('React 19 useTransition Hook Performance Issues', 'user-emma-house', 'This might be related to the concurrent features. Have you tried using startTransition more selectively? Sometimes batching multiple state updates can help.', '4'),
    ('React 19 useTransition Hook Performance Issues', 'user-jennifer-patel', 'We encountered this in production. Ended up implementing a custom scheduler with time-slicing. Happy to share our solution if you''re interested!', '3'),
    
    ('Server Components Documentation Needs Examples', 'user-olivia-smith', 'Totally agree! I''ve been struggling with the same thing. The conceptual docs are good but we need more ''recipes'' for common scenarios.', '6'),
    ('Server Components Documentation Needs Examples', 'user-ignacio-rossi', 'Have you checked the React team''s GitHub discussions? There are some community examples there that helped me understand the patterns better.', '5'),
    
    ('How to Handle Authentication in Server Components?', 'user-jennifer-patel', 'I''m using a context provider at the root that fetches auth state server-side and passes it down. Works well for most cases but curious about other approaches too.', '5'),
    ('How to Handle Authentication in Server Components?', 'user-matt-silverman', 'Check out Next.js''s authentication patterns with Server Components - they have some good examples that might apply to other frameworks too.', '4'),
    
    ('React DevTools Extension Crashes with Large Component Trees', 'user-olivia-smith', 'Yes! I''ve had this issue too. Sometimes clearing the DevTools cache helps temporarily, but it''s definitely a performance problem with large apps.', '7'),
    ('React DevTools Extension Crashes with Large Component Trees', 'user-ignacio-rossi', 'File a bug report if you haven''t already. The React team is pretty responsive to DevTools issues. Include your React version and a reproduction case if possible.', '6'),
    
    ('Best Practices for State Management in Server Components?', 'user-emma-house', 'We''re using Zustand with careful client/server boundary management. The key is keeping server state on the server and client state on the client.', '8'),
    ('Best Practices for State Management in Server Components?', 'user-olivia-smith', 'React Query (TanStack Query) works really well for this. It handles the server/client data synchronization automatically.', '7')
) AS comments(post_title, user_id, content, days_ago)
WHERE p.title = comments.post_title;

-- Insert upvotes (randomized but deterministic)
WITH post_refs AS (
  SELECT id, "authorId" FROM posts
),
user_upvotes AS (
  SELECT 
    u.id as user_id,
    p.id as post_id,
    row_number() OVER (PARTITION BY u.id ORDER BY random()) as rn
  FROM users u
  CROSS JOIN post_refs p
  WHERE u.id != p."authorId" -- Users don't upvote their own posts
)
INSERT INTO post_upvotes (id, "postId", "userId", "createdAt", "updatedAt")
SELECT 
  gen_random_uuid(),
  post_id,
  user_id,
  NOW() - (floor(random() * 10)::text || ' days')::INTERVAL,
  NOW() - (floor(random() * 10)::text || ' days')::INTERVAL
FROM user_upvotes
WHERE rn <= 4 + floor(random() * 3); -- Each user upvotes 4-6 posts

-- Display summary
DO $$
DECLARE
  user_count INTEGER;
  post_count INTEGER;
  comment_count INTEGER;
  upvote_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO user_count FROM users;
  SELECT COUNT(*) INTO post_count FROM posts;
  SELECT COUNT(*) INTO comment_count FROM post_comments;
  SELECT COUNT(*) INTO upvote_count FROM post_upvotes;
  
  RAISE NOTICE '🎉 Database seeded successfully!';
  RAISE NOTICE '👥 Users: %', user_count;
  RAISE NOTICE '📝 Posts: %', post_count;
  RAISE NOTICE '💬 Comments: %', comment_count;
  RAISE NOTICE '👍 Upvotes: %', upvote_count;
END $$;
