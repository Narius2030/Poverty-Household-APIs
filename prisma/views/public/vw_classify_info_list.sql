SELECT
  fi.full_name AS chu_ho,
  res.status AS trang_thai,
  res.a_grade AS phieu_a,
  res.b1_grade AS phieu_b,
  res.b2_grade AS phieu_b2,
  res.final_result AS ket_qua_ra_soat,
  res.classify_person AS nguoi_ra_soat
FROM
  (
    (
      hongheo_classify_result res
      JOIN family_member_info fi ON (
        (
          (fi.family_id = res.family_id)
          AND ((fi.full_name) :: text ~~ 'chủ hộ' :: text)
        )
      )
    )
    JOIN hongheo hn ON ((hn.family_id = fi.family_id))
  );