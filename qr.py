import rospy
import cv2 as cv
from cv_bridge import CvBridge
from sensor_msgs.msg import Image
from pyzbar.pyzbar import decode as qr_read
rospy.init_node('flight')
qr_debug = rospy.Publisher("/qr_debug", Image)
def qr(data):
    barcodes = qr_read(CvBridge().imgmsg_to_cv2(data, 'bgr8'))
    if barcodes:
        f = open('qdata.txt', 'w')
        f.write(barcodes[0].data)
        f.close()
        image_sub.unregister()
image_sub = rospy.Subscriber('main_camera/image_raw', Image, qr, queue_size=1)
rospy.sleep(4)
