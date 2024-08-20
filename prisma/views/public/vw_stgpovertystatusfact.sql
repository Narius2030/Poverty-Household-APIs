SELECT
  fi.family_id,
  fi.years,
  pro.province_name,
  dist.district_name,
  fi.family_code,
  fmi.full_name AS owner_name,
  b1.reason_names,
  b1.get_policy_names,
  b1.need_policy_names,
  rs.a_grade,
  rs.b1_grade,
  rs.b2_grade,
  rs.final_result,
  a.created_date AS a_created_date,
  b1.created_date AS b1_created_date,
  rs.created_date AS rs_created_date
FROM
  (
    (
      (
        (
          (
            (
              a_paper a
              JOIN b1_paper b1 ON ((b1.family_id = a.family_id))
            )
            JOIN hongheo_classify_result rs ON ((rs.family_id = b1.family_id))
          )
          RIGHT JOIN family_info fi ON ((fi.family_id = rs.family_id))
        )
        LEFT JOIN family_member_info fmi ON (
          (
            (fmi.family_id = fi.family_id)
            AND (
              (fmi.owner_relationship) :: text ~~ 'Chủ hộ' :: text
            )
          )
        )
      )
      JOIN locations.province pro ON ((pro.province_code = fi.province_code))
    )
    JOIN locations.district dist ON ((dist.district_code = fi.district_code))
  );