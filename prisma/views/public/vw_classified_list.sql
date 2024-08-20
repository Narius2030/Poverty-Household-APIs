SELECT
  hn.classify_date AS thoi_gian_ra_soat,
  fi.full_name AS chu_ho,
  fi.sex AS gioi_tinh,
  res.a_grade AS phieu_a,
  res.b1_grade AS phieu_b,
  res.b2_grade AS phieu_b2,
  res.final_result AS ket_qua_ra_soat,
  res.classify_person AS nguoi_ra_soat,
  (
    SELECT
      vw_so_nhan_khau.so_nhan_khau
    FROM
      vw_so_nhan_khau
    WHERE
      (fi.family_id = vw_so_nhan_khau.fami_id)
  ) AS so_nhan_khau
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