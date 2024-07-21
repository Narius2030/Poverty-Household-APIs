-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "configs";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "items";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "locations";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "public"."classification" AS ENUM ('hộ nghèo', 'hộ cận nghèo', 'hộ không nghèo');

-- CreateEnum
CREATE TYPE "public"."contract_type" AS ENUM ('có hợp đồng lao động', 'không có hợp đồng lao động', 'không làm công ăn lương');

-- CreateEnum
CREATE TYPE "public"."cul_level" AS ENUM ('chưa tốt nghiệp tiểu học', 'tiểu học', 'trung học cơ sở', 'trung học phổ thông');

-- CreateEnum
CREATE TYPE "public"."edu_level" AS ENUM ('mầm non, mẫu giáo', 'tiểu học', 'trung học cơ sở', 'trung học phổ thông', 'khóa đào tạo ngắn hạn', 'trung cấp', 'cao đẳng', 'đại học trở lên');

-- CreateEnum
CREATE TYPE "public"."job_cate" AS ENUM ('công chức viên chức', 'làm cho doanh nghiệp', 'làm thuê cho hộ gia đình', 'khác');

-- CreateEnum
CREATE TYPE "public"."job_status" AS ENUM ('đang làm việc', 'không có việc làm', 'không có khả năng lao động', 'đang đi học', 'không muốn đi làm', 'nghỉ hưu/nội trợ');

-- CreateEnum
CREATE TYPE "public"."nlnd" AS ENUM ('nông nghiệp', 'lâm nghiệp', 'ngư nghiệp', 'diêm nghiệp');

-- CreateEnum
CREATE TYPE "public"."pension_type" AS ENUM ('đang hưởng lương hưu', 'đang hưởng trợ cấp bảo hiểm xã hội hằng tháng', 'đang hưởng trợ cấp người có công hằng tháng');

-- CreateEnum
CREATE TYPE "public"."tcxh" AS ENUM ('người cao tuổi', 'người khuyết tật', 'trẻ em mồ côi');

-- CreateEnum
CREATE TYPE "public"."train_level" AS ENUM ('chưa qua đào tạo nghề', 'sơ cấp chứng chỉ dạy nghề', 'trung cấp', 'cao đẳng', 'đại học', 'sau đại học');

-- CreateTable
CREATE TABLE "configs"."b1_grade_config" (
    "b1_config_code" CHAR(5) NOT NULL,
    "b1_content" VARCHAR(255) NOT NULL,
    "grade" SMALLINT NOT NULL,
    "region_code" CHAR(5) NOT NULL,

    CONSTRAINT "b1_grade_config_pkey" PRIMARY KEY ("b1_config_code")
);

-- CreateTable
CREATE TABLE "configs"."b2_grade_config" (
    "b2_config_code" CHAR(5) NOT NULL,
    "b2_content" VARCHAR(255) NOT NULL,
    "grade" SMALLINT NOT NULL,
    "notes" VARCHAR(255) NOT NULL,
    "region_code" CHAR(5) NOT NULL,

    CONSTRAINT "b2_grade_config_pkey" PRIMARY KEY ("b2_config_code")
);

-- CreateTable
CREATE TABLE "configs"."company_dept" (
    "dept_code" CHAR(5) NOT NULL,
    "dept_name" VARCHAR(35) NOT NULL,

    CONSTRAINT "company_dept_pkey" PRIMARY KEY ("dept_code")
);

-- CreateTable
CREATE TABLE "configs"."company_organize" (
    "position_code" CHAR(5) NOT NULL,
    "position_name" VARCHAR(25) NOT NULL,

    CONSTRAINT "company_organize_pkey" PRIMARY KEY ("position_code")
);

-- CreateTable
CREATE TABLE "configs"."hocanngheo_grade_range" (
    "grade_range_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "contents" VARCHAR(255) NOT NULL,
    "min_grade" SMALLINT NOT NULL,
    "max_grade" SMALLINT NOT NULL,

    CONSTRAINT "hocanngheo_grade_range_pkey" PRIMARY KEY ("grade_range_id")
);

-- CreateTable
CREATE TABLE "configs"."hongheo_grade_range" (
    "grade_range_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "contents" VARCHAR(255) NOT NULL,
    "min_grade" SMALLINT NOT NULL,
    "max_grade" SMALLINT NOT NULL,

    CONSTRAINT "hongheo_grade_range_pkey" PRIMARY KEY ("grade_range_id")
);

-- CreateTable
CREATE TABLE "configs"."popularity_config" (
    "popularity_config_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "region" VARCHAR(255) NOT NULL,
    "num_of_family" INTEGER,
    "num_of_resident" INTEGER,
    "num_of_ethnic" INTEGER,
    "num_of_ethnic_resident" INTEGER,

    CONSTRAINT "popularity_config_pkey" PRIMARY KEY ("popularity_config_id")
);

-- CreateTable
CREATE TABLE "configs"."structure_company" (
    "position_code" CHAR(5) NOT NULL,
    "dept_code" CHAR(5) NOT NULL,

    CONSTRAINT "structure_company_pkey" PRIMARY KEY ("position_code","dept_code")
);

-- CreateTable
CREATE TABLE "items"."animal" (
    "animal_code" CHAR(5) NOT NULL,
    "animal_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "animal_pkey" PRIMARY KEY ("animal_code")
);

-- CreateTable
CREATE TABLE "items"."asset" (
    "asset_code" CHAR(5) NOT NULL,
    "asset_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "asset_pkey" PRIMARY KEY ("asset_code")
);

-- CreateTable
CREATE TABLE "items"."facilities" (
    "facility_code" CHAR(10) NOT NULL,
    "facility_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "facilities_pkey" PRIMARY KEY ("facility_code")
);

-- CreateTable
CREATE TABLE "items"."hard_reasons" (
    "reason_code" CHAR(10) NOT NULL,
    "reason" VARCHAR(255) NOT NULL,

    CONSTRAINT "hard_reasons_pkey" PRIMARY KEY ("reason_code")
);

-- CreateTable
CREATE TABLE "items"."land" (
    "land_code" CHAR(5) NOT NULL,
    "land_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "land_pkey" PRIMARY KEY ("land_code")
);

-- CreateTable
CREATE TABLE "items"."other_options" (
    "other_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "b1_id" UUID NOT NULL,
    "other_code" CHAR(10),
    "other_name" VARCHAR(35) NOT NULL,

    CONSTRAINT "other_options_pkey" PRIMARY KEY ("other_id")
);

-- CreateTable
CREATE TABLE "items"."support_policies" (
    "policy_code" CHAR(10) NOT NULL,
    "policy_name" VARCHAR(255) NOT NULL,

    CONSTRAINT "support_policies_pkey" PRIMARY KEY ("policy_code")
);

-- CreateTable
CREATE TABLE "locations"."department" (
    "department_code" CHAR(5) NOT NULL,
    "department_name" VARCHAR(50) NOT NULL,
    "province_code" CHAR(5) NOT NULL,

    CONSTRAINT "department_pkey" PRIMARY KEY ("department_code")
);

-- CreateTable
CREATE TABLE "locations"."district" (
    "district_code" CHAR(5) NOT NULL,
    "district_name" VARCHAR(50) NOT NULL,
    "province_code" CHAR(5) NOT NULL,

    CONSTRAINT "district_pkey" PRIMARY KEY ("district_code")
);

-- CreateTable
CREATE TABLE "locations"."province" (
    "province_code" CHAR(5) NOT NULL,
    "province_name" VARCHAR(50) NOT NULL,
    "region_code" CHAR(5) NOT NULL,

    CONSTRAINT "province_pkey" PRIMARY KEY ("province_code")
);

-- CreateTable
CREATE TABLE "locations"."region" (
    "region_code" CHAR(5) NOT NULL,
    "region_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "region_pkey" PRIMARY KEY ("region_code")
);

-- CreateTable
CREATE TABLE "locations"."town" (
    "town_code" CHAR(5) NOT NULL,
    "town_name" VARCHAR(50) NOT NULL,
    "ward_code" CHAR(5) NOT NULL,

    CONSTRAINT "town_pkey" PRIMARY KEY ("town_code")
);

-- CreateTable
CREATE TABLE "locations"."ward" (
    "ward_code" CHAR(5) NOT NULL,
    "ward_name" VARCHAR(50) NOT NULL,
    "district_code" CHAR(5) NOT NULL,

    CONSTRAINT "ward_pkey" PRIMARY KEY ("ward_code")
);

-- CreateTable
CREATE TABLE "public"."a_condition_info" (
    "condition_code" CHAR(5) NOT NULL,
    "condition_content" VARCHAR(255) NOT NULL,

    CONSTRAINT "a_condition_info_pkey" PRIMARY KEY ("condition_code")
);

-- CreateTable
CREATE TABLE "public"."a_paper" (
    "a_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "family_id" UUID NOT NULL,
    "fast_classify_person" VARCHAR(35),
    "send_status" CHAR(5),
    "classify_date" DATE,

    CONSTRAINT "a_paper_pkey" PRIMARY KEY ("a_id")
);

-- CreateTable
CREATE TABLE "public"."animal_possession" (
    "animal_code" CHAR(5) NOT NULL,
    "b1_id" UUID NOT NULL,
    "quantity" INTEGER,

    CONSTRAINT "animal_possession_pkey" PRIMARY KEY ("animal_code","b1_id")
);

-- CreateTable
CREATE TABLE "public"."asset_possession" (
    "asset_code" CHAR(5) NOT NULL,
    "b1_id" UUID NOT NULL,
    "quantity" INTEGER,

    CONSTRAINT "asset_possession_pkey" PRIMARY KEY ("asset_code","b1_id")
);

-- CreateTable
CREATE TABLE "public"."b1_paper" (
    "b1_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "family_id" UUID NOT NULL,
    "is_aquaculture" BOOLEAN,
    "vlc_cotnha" CHAR(5),
    "vlc_mainha" CHAR(5),
    "vlc_tuongnha" CHAR(5),
    "area_house" DOUBLE PRECISION,
    "toilet_in_use" CHAR(5),
    "electricity_source" CHAR(5),
    "monthly_electricity" DOUBLE PRECISION,
    "water_source" CHAR(5),

    CONSTRAINT "b1_paper_pkey" PRIMARY KEY ("b1_id")
);

-- CreateTable
CREATE TABLE "public"."b1_rasoat" (
    "family_id" UUID NOT NULL,
    "b1_config_code" CHAR(5) NOT NULL,
    "checked" BOOLEAN NOT NULL,

    CONSTRAINT "b1_rasoat_pkey" PRIMARY KEY ("family_id","b1_config_code")
);

-- CreateTable
CREATE TABLE "public"."b2_rasoat" (
    "family_id" UUID NOT NULL,
    "b2_config_code" CHAR(5) NOT NULL,
    "checked" BOOLEAN NOT NULL,

    CONSTRAINT "b2_rasoat_pkey" PRIMARY KEY ("family_id","b2_config_code")
);

-- CreateTable
CREATE TABLE "public"."condition_of_family" (
    "condition_code" CHAR(5) NOT NULL,
    "a_id" UUID NOT NULL,

    CONSTRAINT "condition_of_family_pkey" PRIMARY KEY ("a_id","condition_code")
);

-- CreateTable
CREATE TABLE "public"."district_ward_account" (
    "account_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" VARCHAR(35) NOT NULL,
    "passwd" VARCHAR(35) NOT NULL,
    "district_code" CHAR(5) NOT NULL,
    "ward_code" CHAR(5),

    CONSTRAINT "district_ward_account_pkey" PRIMARY KEY ("account_id")
);

-- CreateTable
CREATE TABLE "public"."family_info" (
    "family_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "family_code" VARCHAR(10) NOT NULL,
    "years" SMALLINT NOT NULL,
    "province_code" CHAR(5) NOT NULL,
    "district_code" CHAR(5) NOT NULL,
    "ward_code" CHAR(5) NOT NULL,
    "town_code" CHAR(5),
    "full_name" VARCHAR(35) NOT NULL,
    "sex" BOOLEAN,
    "family_number" VARCHAR(20),
    "nation" VARCHAR(15),
    "nation_in_place" BOOLEAN,
    "year_of_birth" SMALLINT,
    "month_of_birth" SMALLINT,
    "day_of_birth" SMALLINT,
    "identity_card_number" VARCHAR(12),
    "identity_card_date" DATE,
    "temporay_place" VARCHAR(255),

    CONSTRAINT "family_info_pkey" PRIMARY KEY ("family_id")
);

-- CreateTable
CREATE TABLE "public"."family_member_info" (
    "member_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "family_id" UUID NOT NULL,
    "full_name" VARCHAR(35) NOT NULL,
    "owner_relationship" VARCHAR(15),
    "year_of_birth" SMALLINT,
    "month_of_birth" SMALLINT,
    "day_of_birth" SMALLINT,
    "identity_card_number" VARCHAR(12),
    "nation" VARCHAR(15),
    "sex" BOOLEAN,
    "height" INTEGER,
    "weight" INTEGER,
    "education_status" BOOLEAN,
    "education_level" "public"."edu_level",
    "culture_level" "public"."cul_level",
    "training_level" "public"."train_level",
    "has_medical_insurance" BOOLEAN,
    "has_internet" BOOLEAN,
    "social_assistance" "public"."tcxh",
    "has_job" "public"."job_status",
    "job_type" "public"."job_cate",
    "has_contract" "public"."contract_type",
    "has_pension" "public"."pension_type",
    "hard_disease" BOOLEAN,

    CONSTRAINT "family_member_info_pkey" PRIMARY KEY ("member_id")
);

-- CreateTable
CREATE TABLE "public"."get_hard_reasons" (
    "reason_codes" CHAR(10)[],
    "b1_id" UUID NOT NULL,

    CONSTRAINT "get_hard_reasons_pkey" PRIMARY KEY ("b1_id")
);

-- CreateTable
CREATE TABLE "public"."get_support_policies" (
    "policy_codes" CHAR(10)[],
    "b1_id" UUID NOT NULL,

    CONSTRAINT "get_support_policies_pkey" PRIMARY KEY ("b1_id")
);

-- CreateTable
CREATE TABLE "public"."hongheo" (
    "family_id" UUID NOT NULL,
    "last_year_classify" "public"."classification" NOT NULL,
    "classify_date" DATE,
    "classify_person" VARCHAR,

    CONSTRAINT "hongheo_pkey" PRIMARY KEY ("family_id")
);

-- CreateTable
CREATE TABLE "public"."hongheo_classify_result" (
    "result_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "family_id" UUID NOT NULL,
    "family_owner" VARCHAR(35) NOT NULL,
    "a_grade" BOOLEAN NOT NULL,
    "b1_grade" SMALLINT NOT NULL,
    "b2_grade" SMALLINT NOT NULL,
    "final_result" "public"."classification",
    "classify_person" VARCHAR(35),
    "status" CHAR(10) NOT NULL,

    CONSTRAINT "hongheo_classify_result_pkey" PRIMARY KEY ("result_id")
);

-- CreateTable
CREATE TABLE "public"."honlndn" (
    "family_id" UUID NOT NULL,
    "job_title" "public"."nlnd" NOT NULL,
    "classify_date" DATE,
    "monthly_gdp" DOUBLE PRECISION,

    CONSTRAINT "honlndn_pkey" PRIMARY KEY ("family_id")
);

-- CreateTable
CREATE TABLE "public"."income_family" (
    "income_code" CHAR(5) NOT NULL,
    "family_id" UUID NOT NULL,
    "income_content" VARCHAR(255),
    "total_income" DOUBLE PRECISION,
    "total_enxpense" DOUBLE PRECISION,

    CONSTRAINT "income_family_pkey" PRIMARY KEY ("income_code","family_id")
);

-- CreateTable
CREATE TABLE "public"."land_possession" (
    "land_code" CHAR(5) NOT NULL,
    "b1_id" UUID NOT NULL,
    "area" DOUBLE PRECISION,

    CONSTRAINT "land_possession_pkey" PRIMARY KEY ("land_code","b1_id")
);

-- CreateTable
CREATE TABLE "public"."need_support_policies" (
    "policy_codes" CHAR(10)[],
    "b1_id" UUID NOT NULL,

    CONSTRAINT "need_support_policies_pkey" PRIMARY KEY ("b1_id")
);

-- CreateTable
CREATE TABLE "public"."periods" (
    "years" SMALLINT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,

    CONSTRAINT "periods_pkey" PRIMARY KEY ("years")
);

-- CreateTable
CREATE TABLE "public"."user_account" (
    "account_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "username" VARCHAR(35) NOT NULL,
    "passwd" VARCHAR(35) NOT NULL,
    "full_name" VARCHAR(35) NOT NULL,
    "title" VARCHAR(25) NOT NULL,
    "sex" CHAR(7) NOT NULL,
    "birth_date" DATE,
    "phone" CHAR(11),
    "email" VARCHAR(255),
    "address" VARCHAR(255),
    "province" VARCHAR(35),
    "district" VARCHAR(35),
    "ward" VARCHAR(35),
    "is_department_leader" BOOLEAN,

    CONSTRAINT "user_account_pkey" PRIMARY KEY ("account_id")
);

-- CreateIndex
CREATE INDEX "department_code_idx" ON "locations"."department"("department_code");

-- CreateIndex
CREATE INDEX "department_name_idx" ON "locations"."department"("department_name");

-- CreateIndex
CREATE INDEX "district_code_idx" ON "locations"."district"("district_code");

-- CreateIndex
CREATE INDEX "district_name_idx" ON "locations"."district"("district_name");

-- CreateIndex
CREATE INDEX "province_code_idx" ON "locations"."province"("province_code");

-- CreateIndex
CREATE INDEX "province_name_idx" ON "locations"."province"("province_name");

-- CreateIndex
CREATE INDEX "ward_code_idx" ON "locations"."ward"("ward_code");

-- CreateIndex
CREATE INDEX "ward_name_idx" ON "locations"."ward"("ward_name");

-- CreateIndex
CREATE UNIQUE INDEX "family_info_family_code_key" ON "public"."family_info"("family_code");

-- CreateIndex
CREATE INDEX "owner_info_idx" ON "public"."family_info" USING SPGIST ("full_name");

-- CreateIndex
CREATE INDEX "member_name_idx" ON "public"."family_member_info" USING SPGIST ("full_name");

-- AddForeignKey
ALTER TABLE "configs"."b1_grade_config" ADD CONSTRAINT "fk_b1gradeconfig_region" FOREIGN KEY ("region_code") REFERENCES "locations"."region"("region_code") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "configs"."b2_grade_config" ADD CONSTRAINT "fk_b1gradeconfig_region" FOREIGN KEY ("region_code") REFERENCES "locations"."region"("region_code") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "configs"."structure_company" ADD CONSTRAINT "fk_struccomp_deptcomp" FOREIGN KEY ("dept_code") REFERENCES "configs"."company_dept"("dept_code") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "configs"."structure_company" ADD CONSTRAINT "fk_struccomp_organcomp" FOREIGN KEY ("position_code") REFERENCES "configs"."company_organize"("position_code") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "items"."other_options" ADD CONSTRAINT "fk_otheroption_b1paper" FOREIGN KEY ("b1_id") REFERENCES "public"."b1_paper"("b1_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "locations"."department" ADD CONSTRAINT "fk_department_province" FOREIGN KEY ("province_code") REFERENCES "locations"."province"("province_code") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "locations"."district" ADD CONSTRAINT "fk_district_province" FOREIGN KEY ("province_code") REFERENCES "locations"."province"("province_code") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "locations"."province" ADD CONSTRAINT "fk_province_region" FOREIGN KEY ("region_code") REFERENCES "locations"."region"("region_code") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "locations"."town" ADD CONSTRAINT "fk_town_ward" FOREIGN KEY ("ward_code") REFERENCES "locations"."ward"("ward_code") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "locations"."ward" ADD CONSTRAINT "fk_ward_district" FOREIGN KEY ("district_code") REFERENCES "locations"."district"("district_code") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."a_paper" ADD CONSTRAINT "fk_apaper_family" FOREIGN KEY ("family_id") REFERENCES "public"."hongheo"("family_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."animal_possession" ADD CONSTRAINT "fk_assetpossession_animal" FOREIGN KEY ("animal_code") REFERENCES "items"."animal"("animal_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."animal_possession" ADD CONSTRAINT "fk_assetpossession_b1paper" FOREIGN KEY ("b1_id") REFERENCES "public"."b1_paper"("b1_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."asset_possession" ADD CONSTRAINT "fk_assetpossession_asset" FOREIGN KEY ("asset_code") REFERENCES "items"."asset"("asset_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."asset_possession" ADD CONSTRAINT "fk_assetpossession_b1paper" FOREIGN KEY ("b1_id") REFERENCES "public"."b1_paper"("b1_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."b1_paper" ADD CONSTRAINT "fk_b1paper_family" FOREIGN KEY ("family_id") REFERENCES "public"."hongheo"("family_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."b1_rasoat" ADD CONSTRAINT "fk_b1rasoat_b1gradeconfig" FOREIGN KEY ("b1_config_code") REFERENCES "configs"."b1_grade_config"("b1_config_code") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."b1_rasoat" ADD CONSTRAINT "fk_b1rasoat_familyinfo" FOREIGN KEY ("family_id") REFERENCES "public"."hongheo"("family_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."b2_rasoat" ADD CONSTRAINT "fk_b1rasoat_b2gradeconfig" FOREIGN KEY ("b2_config_code") REFERENCES "configs"."b2_grade_config"("b2_config_code") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."b2_rasoat" ADD CONSTRAINT "fk_b1rasoat_familyinfo" FOREIGN KEY ("family_id") REFERENCES "public"."hongheo"("family_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."condition_of_family" ADD CONSTRAINT "fk_conditionfamily_acondition" FOREIGN KEY ("condition_code") REFERENCES "public"."a_condition_info"("condition_code") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."condition_of_family" ADD CONSTRAINT "fk_conditionfamily_apaper" FOREIGN KEY ("a_id") REFERENCES "public"."a_paper"("a_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."district_ward_account" ADD CONSTRAINT "fk_dwaccount_district" FOREIGN KEY ("district_code") REFERENCES "locations"."district"("district_code") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."district_ward_account" ADD CONSTRAINT "fk_dwaccount_ward" FOREIGN KEY ("ward_code") REFERENCES "locations"."ward"("ward_code") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."family_info" ADD CONSTRAINT "fk_familyinfo_district" FOREIGN KEY ("district_code") REFERENCES "locations"."district"("district_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."family_info" ADD CONSTRAINT "fk_familyinfo_periods" FOREIGN KEY ("years") REFERENCES "public"."periods"("years") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."family_info" ADD CONSTRAINT "fk_familyinfo_province" FOREIGN KEY ("province_code") REFERENCES "locations"."province"("province_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."family_info" ADD CONSTRAINT "fk_familyinfo_town" FOREIGN KEY ("town_code") REFERENCES "locations"."town"("town_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."family_info" ADD CONSTRAINT "fk_familyinfo_ward" FOREIGN KEY ("ward_code") REFERENCES "locations"."ward"("ward_code") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."family_member_info" ADD CONSTRAINT "fk_member_family" FOREIGN KEY ("family_id") REFERENCES "public"."family_info"("family_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."get_hard_reasons" ADD CONSTRAINT "fk_gethardreasons_b1paper" FOREIGN KEY ("b1_id") REFERENCES "public"."b1_paper"("b1_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."get_support_policies" ADD CONSTRAINT "fk_getsupportpolicies_b1paper" FOREIGN KEY ("b1_id") REFERENCES "public"."b1_paper"("b1_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."hongheo" ADD CONSTRAINT "fk_hongheo_family" FOREIGN KEY ("family_id") REFERENCES "public"."family_info"("family_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."hongheo_classify_result" ADD CONSTRAINT "fk_hongheoresult_familyinfo" FOREIGN KEY ("family_id") REFERENCES "public"."hongheo"("family_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."honlndn" ADD CONSTRAINT "fk_honlndn_family" FOREIGN KEY ("family_id") REFERENCES "public"."family_info"("family_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."income_family" ADD CONSTRAINT "fk_familyincome_familyinfo" FOREIGN KEY ("family_id") REFERENCES "public"."honlndn"("family_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."land_possession" ADD CONSTRAINT "fk_assetpossession_b1paper" FOREIGN KEY ("b1_id") REFERENCES "public"."b1_paper"("b1_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."land_possession" ADD CONSTRAINT "fk_assetpossession_land" FOREIGN KEY ("land_code") REFERENCES "items"."land"("land_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."need_support_policies" ADD CONSTRAINT "fk_needsupportpolicies_b1paper" FOREIGN KEY ("b1_id") REFERENCES "public"."b1_paper"("b1_id") ON DELETE CASCADE ON UPDATE NO ACTION;

