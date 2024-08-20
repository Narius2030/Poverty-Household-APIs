SELECT
  fi.family_id AS fami_id,
  count(fmi.member_id) AS so_nhan_khau
FROM
  (
    family_info fi
    JOIN family_member_info fmi ON ((fmi.family_id = fi.family_id))
  )
GROUP BY
  fi.family_id;