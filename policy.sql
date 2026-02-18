-- How to check if a row exists

EXISTS (
  SELECT 1 FROM extended_family
  WHERE extended_family.shoe_size = 10
  AND extended_family.fave_color = 'red'
)

-- Policy for reps to only add their own deals
CREATE policy "Reps can only add their own deals"
ON public.sales_deals
FOR insert
TO authenticated
WITH CHECK (
  auth.uid() = user_id
  AND EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.id = auth.uid()
    AND user_profiles.account_type = 'rep'
  )
);


-- Admins to add anyone's deals
-- Challenge:
-- 1) Write a policy below called 'Admins to add anyone's deals'
-- 2) Apply the policy to the 'sales_deals' table in the public schema
-- 3) Restrict the policy to authenticated users only
-- 4) Check that admins are making the request by checking
--		- the current user's uid matches a user's 'id' in the 'user_profiles' table
--		- the matching user has an 'account_type' of 'admin'

CREATE policy "Admins to add anyone's deals"
ON public.sales_deals
FOR insert
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles
    WHERE user_profiles.account_type = 'admin'
    AND user_profiles.id = auth.uid()
  )
);
