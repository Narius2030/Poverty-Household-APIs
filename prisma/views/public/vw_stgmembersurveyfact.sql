SELECT
  fmi.member_id,
  fmi.family_id,
  EXTRACT(
    year
    FROM
      fmi.created_date
  ) AS year,
  EXTRACT(
    MONTH
    FROM
      fmi.created_date
  ) AS MONTH,
  pro.province_name,
  dist.district_name,
  fmi.full_name,
  fmi.owner_relationship,
  fmi.year_of_birth,
  fmi.month_of_birth,
  fmi.day_of_birth,
  fmi.identity_card_number,
  fmi.nation,
  rs.final_result,
  fmi.created_date AS member_created_date,
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
          JOIN family_info fi ON ((fi.family_id = rs.family_id))
        )
        JOIN family_member_info fmi ON ((fmi.family_id = fi.family_id))
      )
      JOIN locations.province pro ON ((pro.province_code = fi.province_code))
    )
    JOIN locations.district dist ON ((dist.district_code = fi.district_code))
  );