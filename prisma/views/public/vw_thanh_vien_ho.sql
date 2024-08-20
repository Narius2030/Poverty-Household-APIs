SELECT
  fmi.full_name AS ho_va_ten,
  fmi.owner_relationship AS quan_he_chu_ho,
  fmi.day_of_birth,
  fmi.month_of_birth,
  fmi.year_of_birth,
  fmi.identity_card_number AS cccd,
  fmi.nation AS dan_toc,
  fmi.sex AS gioi_tinh
FROM
  (
    family_info fi
    JOIN family_member_info fmi ON ((fmi.family_id = fi.family_id))
  );