SELECT
  (
    (
      ((pro.province_code) :: bigint * 100000000) + ((dist.district_code) :: integer * 100000)
    ) + (w.ward_code) :: integer
  ) AS "?column?",
  re.region_code,
  re.region_name,
  pro.province_code,
  pro.province_name,
  dist.district_code,
  dist.district_name,
  w.ward_code,
  w.ward_name
FROM
  (
    (
      (
        locations.region re
        JOIN locations.province pro ON ((re.region_code = pro.region_code))
      )
      JOIN locations.district dist ON ((dist.province_code = pro.province_code))
    )
    JOIN locations.ward w ON ((w.district_code = dist.district_code))
  );