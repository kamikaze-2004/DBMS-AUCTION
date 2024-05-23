DELIMITER //

CREATE PROCEDURE get_prodInfo(IN prodid varchar(255),
out p_id varchar(25),
out p_uname varchar(25),
out p_price bigint,
out p_you int,
out p_duration bigint,
out p_imagePaths varchar(255),
out p_saleType varchar(25),
out p_soldStatus varchar(25),
out p_carBrand varchar(25),
out p_carModel varchar(25),
out p_createdAt datetime)
begin 

select prod_id,car_brand,car_model,price,y_o_u,image_paths,username,duration,sold_status,sale_type,createdAt into p_id,p_carBrand,p_carModel,p_price,p_you,p_imagePaths,p_uname,p_duration,p_soldStatus,p_saleType,p_createdAt from prods where prod_id=prodid;
end//
DELIMITER ;

drop procedure get_prodInfo;