variable "aws_access_key" {
  description = "AWS account ID"
  type = string
}

variable "aws_secret_key" {
  description = "AWS secret key"
  type = string
}

variable "aws-region" {
  description = "AWS region for the infrastructure"
  type = string
  default = "us-east-1"
}
