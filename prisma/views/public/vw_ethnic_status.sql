SELECT
  family_id AS id_ho,
  full_name AS ten_chu_ho,
  CASE
    WHEN ((nation) :: text ~~ 'kinh' :: text) THEN 'Kinh' :: text
    WHEN ((nation) :: text !~~ 'kinh' :: text) THEN 'Thiểu số' :: text
    ELSE NULL :: text
  END AS loai_dan_toc
FROM
  family_member_info fi;