SELECT
  a.family_id,
  a.a_id,
  a.fast_classify_person,
  EXTRACT(
    year
    FROM
      rs.created_date
  ) AS year,
  EXTRACT(
    MONTH
    FROM
      rs.created_date
  ) AS MONTH,
  a.condition_codes,
  a.condition_names,
  b1.b1_id,
  b1.is_aquaculture,
  b1.electricity_source,
  b1.water_source,
  b1.reason_names,
  b1.get_policy_names,
  b1.need_policy_names,
  rs.a_grade,
  rs.b1_grade,
  rs.b2_grade,
  rs.final_result,
  rs.classify_person,
  a.created_date AS a_created_date,
  b1.created_date AS b1_created_date,
  rs.created_date AS rs_created_date
FROM
  (
    (
      a_paper a
      JOIN b1_paper b1 ON ((b1.family_id = a.family_id))
    )
    JOIN hongheo_classify_result rs ON ((rs.family_id = b1.family_id))
  );