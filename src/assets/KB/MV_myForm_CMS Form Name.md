# CMS Form Name

## Logic

+ If there are multiple entries configured in CMS with the same program name, SAP uses the the form name in ESS myFrom configuration in **upper case** to get the PDF in CMS.
  + ![](https://rooby.oss-cn-hangzhou.aliyuncs.com/img/20190524153150.png)
  + ![](https://rooby.oss-cn-hangzhou.aliyuncs.com/img/20190524153331.png)
  + In this example, the PDF must be uploaded under name **DEUV MELDUNG YEARLY**.
+ If there is only 1 entry configured in CMS with the same program, it doesn't matter what form name is configured, the PDF will be shown.
+ If the translation of form name in the login language is maintained, the translated text will be used, otherwise EN text will be used. *So it means if the translation is maintained, the PDF should be uploaded with the same translated form name*.