-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "TrialStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'TO_CHECK', 'IN_CONFERENCE', 'CHECKED', 'SENT');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('CALCULATION_ADJUSTMENT_3', 'GR_CALCULATION_ADJUSTMENT', 'FINANCIAL_ANALYSIS', 'TCD_ANALYSIS', 'WORKING_HOURS_ACCOUNTING', 'UPDATE', 'UPDATE_AND_OPINION', 'REAL_ESTATE_EVALUATION', 'CALCULATIONS_AND_OPINION', 'CALCULATIONS_AND_QUESTION', 'CHEQUE_SPECIAL_CALCULATIONS', 'COMPENSATION_CALCULATIONS', 'FGTS_CALCULATIONS', 'LOAS_CALCULATIONS', 'RESCISSION_CALCULATIONS', 'CALCULATIONS_AND_IMPUGNATION', 'AGREEMENT_CALCULATIONS', 'LIQUIDATION_CALCULATIONS', 'REDUCED_LIQUIDATION_CALCULATIONS', 'INSS_AND_IR_CALCULATIONS', 'INSTRUCTION_CALCULATIONS', 'CALCULATIONS_CONFERENCE', 'JUDGMENT_CONTINGENCY', 'INITIAL_CONTINGENCY', 'SENTENCE_CONTINGENCY', 'DILIGENCE', 'CLARIFICATION', 'INFLATIONARY_PURGE', 'IMPUGNATION', 'PERITIAL_HONORARIUM_IMPUGNATION', 'REAL_ESTATE_IMPUGNATION', 'CALCULATION_ENV_BAS_INFO', 'TECHNICAL_OPINION', 'INSALUBRITY_EXPERTISE', 'INSTRUCTION_EXPERTISE', 'MEDICAL_EXPERTISE', 'OFFICIAL_EXPERTISE', 'DANGEROUSNESS_EXPERTISE', 'MEDICAL_QUESTION', 'QUESTIONS', 'QUESTIONS_AND_IMPUGNATION', 'REAL_ESTATE_QUESTIONS', 'FINANCING_RECAL', 'MANAGERIAL_REPORT', 'DOCUMENTATION_REQUEST', 'DILIGENCE_TERM', 'IMPUGNATION_VIEW', 'ACTUARIAL_CALCULATION', 'OTHERS');

-- CreateEnum
CREATE TYPE "TrialSide" AS ENUM ('PLAINTIFF', 'DEFENDANT', 'OFFICIAL');

-- CreateTable
CREATE TABLE "user" (
    "user_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "company" (
    "company_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "tax_number" TEXT,
    "notes" TEXT,
    "receiptDescription" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("company_id")
);

-- CreateTable
CREATE TABLE "trial" (
    "trial_id" SERIAL NOT NULL,
    "client_id" INTEGER NOT NULL,
    "office_id" INTEGER,
    "status" "TrialStatus" NOT NULL DEFAULT 'PENDING',
    "orderable_status" INTEGER NOT NULL DEFAULT 0,
    "trial_requested_by_office" BOOLEAN NOT NULL,
    "lawyer" TEXT,
    "email" TEXT,
    "task_type" "TaskType" NOT NULL,
    "trial_number" TEXT,
    "deadline" DATE NOT NULL,
    "side" "TrialSide",
    "plaintiff" TEXT,
    "defendant" TEXT,
    "private_annotations" TEXT,
    "public_annotations" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trial_pkey" PRIMARY KEY ("trial_id")
);

-- CreateTable
CREATE TABLE "trial_history" (
    "trial_history_id" SERIAL NOT NULL,
    "trial_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" "TrialStatus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trial_history_pkey" PRIMARY KEY ("trial_history_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "company_tax_number_key" ON "company"("tax_number");

-- AddForeignKey
ALTER TABLE "trial" ADD CONSTRAINT "trial_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "company"("company_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trial" ADD CONSTRAINT "trial_office_id_fkey" FOREIGN KEY ("office_id") REFERENCES "company"("company_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trial_history" ADD CONSTRAINT "trial_history_trial_id_fkey" FOREIGN KEY ("trial_id") REFERENCES "trial"("trial_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trial_history" ADD CONSTRAINT "trial_history_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
