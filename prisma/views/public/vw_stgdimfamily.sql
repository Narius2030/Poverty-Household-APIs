SELECT
  fi.family_id,
  fi.family_code,
  fi.family_type,
  fi.years,
  pro.province_code,
  pro.province_name,
  dist.district_code,
  dist.district_name,
  w.ward_code,
  w.ward_name,
  fi.family_number,
  fi.nation_in_place,
  fi.created_date
FROM
  (
    (
      (
        family_info fi
        JOIN locations.province pro ON ((fi.province_code = pro.province_code))
      )
      JOIN locations.district dist ON ((dist.district_code = fi.district_code))
    )
    JOIN locations.ward w ON ((w.ward_code = fi.ward_code))
  );