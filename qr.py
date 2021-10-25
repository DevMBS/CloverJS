import rospy
import cv2 as cv
from clover import srv
from cv_bridge import CvBridge
from sensor_msgs.msg import Image
from pyzbar.pyzbar import decode as qr_read
rospy.init_node('flight')
bridge = CvBridge()
qr_debug = rospy.Publisher("/qr_debug", Image)
def qr_check(data):
    frame = bridge.imgmsg_to_cv2(data, 'bgr8')
    barcodes = qr_read(frame)
    if barcodes:
        f = open('qdata.txt', 'w')
        f.write(barcodes[0].data)
        f.close()
        image_sub.unregister()
image_sub = rospy.Subscriber('main_camera/image_raw', Image, qr_check, queue_size=1)  # try to read qr
rospy.sleep(4)